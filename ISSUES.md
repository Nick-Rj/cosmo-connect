# Issue Tracker

This document tracks the issues encountered during the development and deployment of the Cosmo-Connect application, along with their solutions. Issues are listed in reverse chronological order (newest first).

## Table of Contents
- [Vite Build Failure in Production](#vite-build-failure-in-production)
- [Circular Dependency in Package Management](#circular-dependency-in-package-management)

## Vite Build Failure in Production

### Issue
**Date**: December 16, 2025  
**Status**: Resolved  
**Priority**: High  
**Environment**: Production

**Error**:  
`sh: 1: vite: not found` during production build

**Description**:  
The build process was failing in the production environment when running the `vite build` command because Vite and its React plugin were only listed in `devDependencies` and thus weren't being installed in production environments.

**Affected Files**:
- `frontend/package.json`

### Solution
Moved the following packages from `devDependencies` to `dependencies` in `frontend/package.json`:
- `vite`
- `@vitejs/plugin-react`

**Verification**:  
The build process now completes successfully in both development and production environments. The production bundle size remains unaffected as these build tools are not included in the final client-side bundle.

**Commit**:  
[Reference to commit hash or PR number]

---

## Circular Dependency in Package Management

### Issue
**Date**: December 16, 2025  
**Status**: Resolved  
**Priority**: High  
**Environment**: Development/Production

**Error**:  
Automatic addition of circular dependencies in package.json files

**Description**:  
The build process was automatically adding circular dependencies in the form of `"cosmo-connect": "file:.."` to both `frontend/package.json` and `backend/package.json`. This occurred because npm was trying to link the root package as a dependency in subdirectories during installation.

**Symptoms**:
- Build failures or infinite loops during installation
- Unexpected changes to package.json files
- Deployment issues in production environments

**Affected Files**:
- `frontend/package.json`
- `backend/package.json`
- `package.json` (root)

### Solution
1. **Immediate Fix**:
   - Removed the circular dependency entries from both `frontend/package.json` and `backend/package.json`
   - Modified the build scripts to prevent automatic addition of these dependencies

2. **Root Cause**:
   - Running `npm install` in subdirectories while the root package had a name (cosmo-connect)
   - npm automatically tries to link the root package as a dependency in subdirectories

3. **Prevention**:
   - Use `--no-package-lock` flag when installing in subdirectories
   - Consider implementing a proper monorepo structure using tools like Lerna or Yarn Workspaces
   - Add a pre-commit hook to prevent these changes from being committed

**Verification**:  
The package installation now completes without adding circular dependencies, and the build process runs as expected.

**Commit**:  
[Reference to commit hash or PR number]

---

## Issue Template

### Issue
**Date**: [YYYY-MM-DD]  
**Status**: [Open/In Progress/Resolved]  
**Priority**: [Low/Medium/High/Critical]  
**Environment**: [Development/Staging/Production]

**Error**:  
[Error message or brief description]

**Description**:  
[Detailed description of the issue]

**Symptoms**:
- [List of observed symptoms]
- [Any relevant error messages or logs]

**Affected Files**:
- [List of affected files with paths]

### Solution
[Detailed description of the solution]

**Verification**:  
[Steps to verify the fix]

**Commit**:  
[Reference to commit hash or PR number]

---
*Document last updated: December 16, 2025*
